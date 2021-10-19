package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.ActivityDto;
import com.core.rupprojectscore.dto.ActivityHoursDto;
import com.core.rupprojectscore.dto.ActivityMemberDto;
import com.core.rupprojectscore.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "activities", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ActivityResource {

    private final ActivityService service;

    @PutMapping(value = "{id}/assign")
    public ActivityDto assignActivity(final @PathVariable("id") Long activityId,
                                      final @RequestBody ActivityMemberDto activityMemberDto) {
        return service.assignActivity(activityId, activityMemberDto);
    }

    @PostMapping(value = "splitActivity/{id}")
    public ActivityDto splitActivity(final @PathVariable("id") Long notAssignedCostId) {
        return service.splitActivity(notAssignedCostId);
    }

    @PutMapping(value = "{id}/reestimate")
    public ActivityDto reestimateActivity(final @PathVariable("id") Long id,
                                          final @RequestBody ActivityHoursDto activityHoursDto) {
        return service.reestimateActivity(id, activityHoursDto);
    }

    @PutMapping(value = "{id}")
    public ActivityDto closeActivity(final @PathVariable("id") Long id) {
        return service.closeActivity(id);
    }

    @DeleteMapping("{id}")
    public void mergeActivity(final @PathVariable("id") Long id) {
        service.mergeActivity(id);
    }

    @GetMapping("/{id}")
    public ActivityDto openActivity(@PathVariable Long id) {
        return service.openActivity(id);
    }


}
