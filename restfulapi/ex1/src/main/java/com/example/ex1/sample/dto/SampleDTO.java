package com.example.ex1.sample.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SampleDTO {
    private long ssn;
    public String name;
}
