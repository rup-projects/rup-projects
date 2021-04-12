package com.core.rupprojectscore.repository;

import com.core.rupprojectscore.entity.NotAssignedCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotAssignedCostRepository extends JpaRepository<NotAssignedCost, Long> {
}
