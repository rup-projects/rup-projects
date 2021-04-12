package com.core.rupprojectscore.repository;

import com.core.rupprojectscore.entity.Realization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealizationRepository extends JpaRepository<Realization, Long> {
}
