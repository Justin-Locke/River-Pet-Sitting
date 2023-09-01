package com.nashss.se.musicplaylistservice.activity;

import com.nashss.se.musicplaylistservice.activity.requests.CreatePetRequest;
import com.nashss.se.musicplaylistservice.dynamodb.PetDao;
import com.nashss.se.musicplaylistservice.dynamodb.models.Pet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

class CreatePetActivityTest {
    @Mock
    private PetDao petDao;

    private CreatePetActivity createPetActivity;

    @BeforeEach
    void setUp() {
        openMocks(this);
        createPetActivity = new CreatePetActivity(petDao);
    }

    @Test
    public void handleRequest_withValidFields_createsAndSavesPet() {
        // GIVEN
        String expectedName = "expectedName";
        String expectedOwnerId = "expectedOwnerId";

        CreatePetRequest request = CreatePetRequest.builder()
                .withPetName(expectedName)
                .withOwnerId(expectedOwnerId)
                .build();

        // WHEN
        CreatePetResult result = createPetActivity.handleRequest(request);

        // THEN
        verify(petDao).savePet(any(Pet.class));

        assertNotNull(result.getPet().getId());
        assertEquals(expectedName, result.getPet().getPetName());

    }
}