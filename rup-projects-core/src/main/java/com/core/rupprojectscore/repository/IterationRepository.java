package com.core.rupprojectscore.repository;

import com.core.rupprojectscore.entity.Iteration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IterationRepository extends JpaRepository<Iteration, Long> {
}
