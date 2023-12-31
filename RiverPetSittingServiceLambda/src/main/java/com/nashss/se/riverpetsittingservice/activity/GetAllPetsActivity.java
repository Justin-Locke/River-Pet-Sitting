package com.nashss.se.riverpetsittingservice.activity;

import com.nashss.se.riverpetsittingservice.activity.requests.GetAllPetsRequest;
import com.nashss.se.riverpetsittingservice.activity.results.GetAllPetsResult;
import com.nashss.se.riverpetsittingservice.converters.ModelConverter;
import com.nashss.se.riverpetsittingservice.dynamodb.PetDao;
import com.nashss.se.riverpetsittingservice.dynamodb.models.Pet;
import com.nashss.se.riverpetsittingservice.models.PetModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;
import java.util.List;

public class GetAllPetsActivity {
    private final Logger log = LogManager.getLogger();
    private final PetDao petDao;

    @Inject
    public GetAllPetsActivity(PetDao petDao) {
        this.petDao = petDao;
    }

    public GetAllPetsResult handleRequest(final GetAllPetsRequest getAllPetsRequest) {
        log.info("Received GetAllPetsRequest {}", getAllPetsRequest);
        String ownerId = getAllPetsRequest.getOwnerId();

        List<Pet> pets = petDao.getAllPets(ownerId);
        log.info("All Pets size =" + pets.size());
        List<PetModel> petModels = new ModelConverter().toPetModelList(pets);

        return GetAllPetsResult.builder()
                .withPets(petModels)
                .build();
    }
}
