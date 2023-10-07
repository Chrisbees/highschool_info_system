package com.chrisbees.spring.security.practice.services;

import com.chrisbees.spring.security.practice.dto.ParentsDTO;
import com.chrisbees.spring.security.practice.model.Parents;
import com.chrisbees.spring.security.practice.repository.ParentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final ParentsRepository parentsRepository;

    public ParentsDTO createParents(Parents parents) {
        var parent = parentsRepository.save(parents);
        return new ParentsDTO(parents);
    }

    public Parents getParentsById(Integer id) {
        return parentsRepository.findById(id)
                .orElseThrow(()->new UsernameNotFoundException("this parent does not exists"));
    }

    public List<Parents> getAllParents() {
        return parentsRepository.findAll();
    }

    public void deleteParents(Integer id) {
        var parents = getParentsById(id);
        parentsRepository.deleteById(parents.getId());
    }

    public Parents updateParent(Integer id, Parents parents) {
        var parent = getParentsById(id);
        parent.setFirstName(parents.getFirstName());
        parent.setLastName(parents.getLastName());
        parent.setGender(parents.getGender());
        parent.setContact(parents.getContact());
        parent.setOccupation(parents.getOccupation());
        return parentsRepository.save(parent);
    }
}
