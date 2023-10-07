package com.chrisbees.spring.security.practice.controller;


import com.chrisbees.spring.security.practice.dto.ParentsDTO;
import com.chrisbees.spring.security.practice.model.Parents;
import com.chrisbees.spring.security.practice.services.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/parents/")
public class ParentsController{

    private final ParentService parentService;

    @PostMapping("/addParent")
    public ParentsDTO createParents(@RequestBody Parents parents){
        return parentService.createParents(parents);
    }

    @GetMapping("/{id}")
    public Parents getParent(@PathVariable Integer id){
        return parentService.getParentsById(id);
    }

    @GetMapping("/allParents")
    public List<Parents> getAllParents(){
        return parentService.getAllParents();
    }

    @DeleteMapping("/{id}")
    public void deleteParent(@PathVariable Integer id){
        parentService.deleteParents(id);
    }

    @PutMapping("/update/{id}")
    public Parents updateParentInfo(@PathVariable Integer id, @RequestBody Parents parents){
        return parentService.updateParent(id, parents);
    }
}
