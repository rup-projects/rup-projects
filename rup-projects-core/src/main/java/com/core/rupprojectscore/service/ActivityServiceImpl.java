package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ActivityDto;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Override
    public ActivityDto closeActivity(Long id) {
        return null;
    }

    @Override
    public ActivityDto mergeActivity(Long id) {
        return null;
    }

    @Override
    public ActivityDto splitActivity(ActivityDto dto) {
        return null;
    }

    @Override
    public ActivityDto assignActivity(Long activityId, Long memberId) {
        return null;
    }

    @Override
    public ActivityDto reestimateActivity(Long id, Long duration) {
        return null;
    }
}
