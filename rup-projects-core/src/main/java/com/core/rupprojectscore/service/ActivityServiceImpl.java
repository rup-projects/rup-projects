package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ActivityDto;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final NotAssignedCostRepository notAssignedCostRepository;
    private final RealizationRepository realizationRepository;


    @Override
    public ActivityDto closeActivity(Long id) {
        return null;
    }

    @Override
    public void mergeActivity(Long id) {
        Activity activity = activityRepository.findById(id).orElseThrow(() -> new BadRequestException("Cant find activity"));
        activity.getNotAssignedCost().setHours(activity.getNotAssignedCost().getHours() + activity.getHours());
        notAssignedCostRepository.save(activity.getNotAssignedCost());
        activityRepository.delete(activity);
    }

    @Override
    public ActivityDto splitActivity(ActivityDto dto) {
        return null;
    }

    @Override
    public ActivityDto assignActivity(Long activityId, ActivityMemberDto activityMemberDto) {
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new BadRequestException("Cant find activity"));
        if (activityMemberDto.getRealizationId() == null) {
            activity.setRealization(null);
            activity.setStartDateTime(null);
        } else {
            Realization realization = realizationRepository.findById(activityMemberDto.getRealizationId()).orElseThrow(() -> new BadRequestException("Cant find realization"));
            activity.setStartDateTime(activityMemberDto.getDatetime());
            activity.setRealization(realization);
        }
        activityRepository.save(activity);
        return modelToDto(activity);
    }

    @Override
    public ActivityDto reestimateActivity(Long id, ActivityHoursDto activityHoursDto) {
        Activity activity = activityRepository.findById(id).orElseThrow(() -> new BadRequestException("Cant find activity"));
        NotAssignedCost notAssignedCost = activity.getNotAssignedCost();
        notAssignedCost.setHours(notAssignedCost.getHours() - activityHoursDto.getDuration());
        notAssignedCostRepository.save(notAssignedCost);
        activity.setHours(activityHoursDto.getDuration());
        return modelToDto(activityRepository.save(activity));
    }

    @Override
    public ActivityDto splitActivity(Long notAssignedCostId) {
        NotAssignedCost notAssignedCost = notAssignedCostRepository.findById(notAssignedCostId)
                .orElseThrow(() -> new BadRequestException("Cant find not assigned cost id"));
        Activity activity = Activity.builder()
                .notAssignedCost(notAssignedCost)
                .hours(1L)
                .description("activity" + notAssignedCost.getType().name())
                .build();
        activityRepository.save(activity);
        notAssignedCost.setHours(notAssignedCost.getHours() - 1);
        notAssignedCostRepository.save(notAssignedCost);
        return modelToDto(activity);
    }
}
