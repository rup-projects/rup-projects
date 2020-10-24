package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.ActivityDto;
import com.core.rupprojectscore.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PutMapping("{id}/member/{memberId}")
    public ActivityDto assignActivity(final @PathVariable("id") Long activityId,
                                      final @PathVariable("memberId") Long memberId) {
        return service.assignActivity(activityId, memberId);
    }

    @PutMapping(value = "{id}", params = "!duration")
    public ActivityDto closeActivity(final @PathVariable("id") Long id) {
        return service.closeActivity(id);
    }

    @DeleteMapping("{id}")
    public ActivityDto mergeActivity(final @PathVariable("id") Long id) {
        return service.mergeActivity(id);
    }

    @PutMapping(value = "{id}", params = "{duration}")
    public ActivityDto reestimateActivity(final @PathVariable("id") Long id,
                                          final @RequestBody Long duration) {
        return service.reestimateActivity(id, duration);
    }

    @PostMapping
    public ActivityDto splitActivity(final @RequestBody ActivityDto dto) {
        return service.splitActivity(dto);
    }

}
