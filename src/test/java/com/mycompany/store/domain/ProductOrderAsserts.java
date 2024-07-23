package com.mycompany.store.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ProductOrderAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductOrderAllPropertiesEquals(ProductOrder expected, ProductOrder actual) {
        assertProductOrderAutoGeneratedPropertiesEquals(expected, actual);
        assertProductOrderAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductOrderAllUpdatablePropertiesEquals(ProductOrder expected, ProductOrder actual) {
        assertProductOrderUpdatableFieldsEquals(expected, actual);
        assertProductOrderUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductOrderAutoGeneratedPropertiesEquals(ProductOrder expected, ProductOrder actual) {
        assertThat(expected)
            .as("Verify ProductOrder auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductOrderUpdatableFieldsEquals(ProductOrder expected, ProductOrder actual) {
        assertThat(expected)
            .as("Verify ProductOrder relevant properties")
            .satisfies(e -> assertThat(e.getPlacedDate()).as("check placedDate").isEqualTo(actual.getPlacedDate()))
            .satisfies(e -> assertThat(e.getStatus()).as("check status").isEqualTo(actual.getStatus()))
            .satisfies(e -> assertThat(e.getCode()).as("check code").isEqualTo(actual.getCode()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductOrderUpdatableRelationshipsEquals(ProductOrder expected, ProductOrder actual) {
        assertThat(expected)
            .as("Verify ProductOrder relationships")
            .satisfies(e -> assertThat(e.getCustomer()).as("check customer").isEqualTo(actual.getCustomer()));
    }
}
