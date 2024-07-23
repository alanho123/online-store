package com.mycompany.store.domain;

import static com.mycompany.store.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class InvoiceAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvoiceAllPropertiesEquals(Invoice expected, Invoice actual) {
        assertInvoiceAutoGeneratedPropertiesEquals(expected, actual);
        assertInvoiceAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvoiceAllUpdatablePropertiesEquals(Invoice expected, Invoice actual) {
        assertInvoiceUpdatableFieldsEquals(expected, actual);
        assertInvoiceUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvoiceAutoGeneratedPropertiesEquals(Invoice expected, Invoice actual) {
        assertThat(expected)
            .as("Verify Invoice auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvoiceUpdatableFieldsEquals(Invoice expected, Invoice actual) {
        assertThat(expected)
            .as("Verify Invoice relevant properties")
            .satisfies(e -> assertThat(e.getDate()).as("check date").isEqualTo(actual.getDate()))
            .satisfies(e -> assertThat(e.getDetails()).as("check details").isEqualTo(actual.getDetails()))
            .satisfies(e -> assertThat(e.getStatus()).as("check status").isEqualTo(actual.getStatus()))
            .satisfies(e -> assertThat(e.getPaymentMethod()).as("check paymentMethod").isEqualTo(actual.getPaymentMethod()))
            .satisfies(e -> assertThat(e.getPaymentDate()).as("check paymentDate").isEqualTo(actual.getPaymentDate()))
            .satisfies(
                e ->
                    assertThat(e.getPaymentAmount())
                        .as("check paymentAmount")
                        .usingComparator(bigDecimalCompareTo)
                        .isEqualTo(actual.getPaymentAmount())
            )
            .satisfies(e -> assertThat(e.getCode()).as("check code").isEqualTo(actual.getCode()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertInvoiceUpdatableRelationshipsEquals(Invoice expected, Invoice actual) {
        assertThat(expected)
            .as("Verify Invoice relationships")
            .satisfies(e -> assertThat(e.getOrder()).as("check order").isEqualTo(actual.getOrder()));
    }
}
