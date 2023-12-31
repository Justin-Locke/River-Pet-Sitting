package com.nashss.se.riverpetsittingservice.activity.requests;

    public class GetPetRequest {
        private final String petId;

        public GetPetRequest(String petId) {
            this.petId = petId;
        }

        public String getPetId() {
            return petId;
        }

        @Override
        public String toString() {
            return "GetPetRequest{" +
                    "petId='" + petId + '\'' +
                    '}';
        }
        //CHECKSTYLE:OFF:Builder
        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String petId;

            public Builder withPetId(String petId) {
                this.petId = petId;
                return this;
            }

            public GetPetRequest build() {
                return new GetPetRequest(petId);
            }
            }
        }
    
