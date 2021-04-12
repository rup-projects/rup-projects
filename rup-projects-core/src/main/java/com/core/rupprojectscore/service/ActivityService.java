package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ActivityDto;
import com.core.rupprojectscore.dto.ActivityHoursDto;
import com.core.rupprojectscore.dto.ActivityMemberDto;

public interface ActivityService {

    ActivityDto closeActivity(Long id);

    void mergeActivity(Long id);

    ActivityDto splitActivity(ActivityDto dto);

    ActivityDto assignActivity(Long activityId, Long memberId);

    ActivityDto reestimateActivity(Long id, ActivityHoursDto activityHoursDto);

    ActivityDto splitActivity(Long notAssignedCostId);
}
