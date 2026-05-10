package com.example.userapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.userapp.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}