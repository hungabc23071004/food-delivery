package com.hung.Mapper;
import com.hung.dto.request.ContactInformationRequest;
import com.hung.entity.ContactInformation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface ContactInformationMapper {
    ContactInformation toContactInformation(ContactInformationRequest contactInformationRequest);
}
