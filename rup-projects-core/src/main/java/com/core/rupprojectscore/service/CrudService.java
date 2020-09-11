package com.core.rupprojectscore.service;

import java.util.List;

public interface CrudService<DTO> {
    List<DTO> getAll();

    DTO getById(Long id);

    DTO save(DTO dto);

    void delete(Long id);
}
