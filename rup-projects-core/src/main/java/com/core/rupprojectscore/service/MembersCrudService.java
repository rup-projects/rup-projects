package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MembersCrudService implements CrudService<MemberDto> {

    private final MemberRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    @Override
    public List<MemberDto> getAll() {
        return mapper.map(repository.findAll(), new TypeToken<List<MemberDto>>() {
        }.getType());
    }

    @Override
    public MemberDto getById(Long id) {
        return mapper.map(repository.findById(id), MemberDto.class);
    }

    @Override
    public MemberDto save(MemberDto memberDto) {
        return mapper.map(
                repository.save(mapper.map(memberDto, Member.class)), MemberDto.class
        );
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
