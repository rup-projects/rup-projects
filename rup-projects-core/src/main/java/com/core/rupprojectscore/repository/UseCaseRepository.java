package com.core.rupprojectscore.repository;

import com.core.rupprojectscore.entity.UseCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UseCaseRepository extends JpaRepository<UseCase, Long> {

}
