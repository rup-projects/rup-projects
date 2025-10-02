package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.RealizationDto;
import com.core.rupprojectscore.entity.Activity;
import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.entity.NotAssignedCost;
import com.core.rupprojectscore.entity.Realization;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.core.rupprojectscore.repository.IterationRepository;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.core.rupprojectscore.dto.IterationDto.dtoToModel;
import static com.core.rupprojectscore.dto.IterationDto.modelToDto;

@Service
@RequiredArgsConstructor
public class IterationService {

    private final IterationRepository repository;
    private final MemberRepository memberRepository;

    public List<IterationDto> openIterations() {
        return repository.findAll().stream().map(IterationDto::modelToDto).collect(Collectors.toList());
    }

    public IterationDto openIteration(Long id) {
        Iteration iteration = repository.findById(id).orElseThrow(() -> new BadRequestException("Cant find not assigned cost id"));
        if (iteration.getRealizations().isEmpty()) {
            List<Member> members = memberRepository.findAll();
            for (Member member : members) {
                iteration.getRealizations().add(new Realization(member));
            }
            repository.save(iteration);
        }
        IterationDto iterationDto = modelToDto(iteration);
        List<String> dateTimes = getWorkDaysBetweenDates(iteration.getStartDate(), iteration.getEndDate()).stream()
                .flatMap(localDate -> toOneHourWorkPeriods(localDate).stream())
                .collect(Collectors.toList());
        iterationDto.setDateTimes(dateTimes);
        return iterationDto;
    }

    public void splitNotAssignedCost(Long id, Long notAssignedCostId) {
        Iteration iteration = repository.findById(id).orElseThrow(() -> new BadRequestException("Cant find not assigned cost id"));
        getNotAssignedCost(notAssignedCostId, iteration)
                .ifPresent(notAssignedCost -> {
                    notAssignedCost.setHours(notAssignedCost.getHours() - 1L);
                    notAssignedCost.getActivities().add(new Activity(notAssignedCost, "activity" + notAssignedCost.getType().name(), 1L));
                });
        repository.save(iteration);
    }

    public void mergeNotAssignedActivity(Long id, Long notAssignedCostId, Long notAssignedActivityId) {
        Iteration iteration = repository.findById(id).orElseThrow(() -> new BadRequestException("Cant find not assigned cost id"));
        getNotAssignedCost(notAssignedCostId, iteration)
                .ifPresent(
                        notAssignedCost -> notAssignedCost.getActivities()
                                .removeIf(activity -> notAssignedActivityId.equals(activity.getId())));
        repository.save(iteration);
    }

    public IterationDto updateIteration(IterationDto iterationDto) {
        return modelToDto(repository.save(dtoToModel(iterationDto)));
    }

    public List<RealizationDto> getRealizations(Long iterationId) {
        Iteration iteration = repository.findById(iterationId).orElseThrow(() -> new BadRequestException("Cant find not assigned cost id"));
        return iteration.getRealizations().stream().map(RealizationDto::modelToDto).collect(Collectors.toList());
    }

    private Optional<NotAssignedCost> getNotAssignedCost(Long notAssignedCostId, Iteration iteration) {
        return iteration.getNotAssignedCosts().stream()
                .filter(notAssignedCost -> notAssignedCostId.equals(notAssignedCost.getId()))
                .findFirst();
    }

    private List<LocalDate> getWorkDaysBetweenDates(LocalDate starDate, LocalDate endDate) {
        return starDate.datesUntil(endDate)
                .filter(localDate -> !List.of(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY).contains(localDate.getDayOfWeek()))
                .collect(Collectors.toList());
    }

    private List<String> toOneHourWorkPeriods(LocalDate localDate) {
        List<String> localDateTimes = new ArrayList<>();
        for (int time : List.of(8, 9, 10, 11, 12, 13, 14, 16, 17)) {
            localDateTimes.add(LocalDateTime.of(localDate, LocalTime.of(time, 0)).toString());
        }
        return localDateTimes;
    }

}
