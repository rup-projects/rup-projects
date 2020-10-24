package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ActivityDto;

public interface ActivityService {

    ActivityDto closeActivity(Long id);

    ActivityDto mergeActivity(Long id);

    ActivityDto splitActivity(ActivityDto dto);

    ActivityDto assignActivity(Long activityId, Long memberId);

    ActivityDto reestimateActivity(Long id, Long duration);
}
