import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Shipment e2e test', () => {
  const shipmentPageUrl = '/shipment';
  const shipmentPageUrlPattern = new RegExp('/shipment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  // const shipmentSample = {"date":"2024-07-22T12:31:13.878Z"};

  let shipment;
  // let invoice;

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/invoices',
      body: {"date":"2024-07-22T00:57:26.001Z","details":"pro","status":"PAID","paymentMethod":"CASH_ON_DELIVERY","paymentDate":"2024-07-22T22:55:19.631Z","paymentAmount":11876.66,"code":"lest"},
    }).then(({ body }) => {
      invoice = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/shipments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/shipments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/shipments/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/invoices', {
      statusCode: 200,
      body: [invoice],
    });

  });
   */

  afterEach(() => {
    if (shipment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/shipments/${shipment.id}`,
      }).then(() => {
        shipment = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (invoice) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/invoices/${invoice.id}`,
      }).then(() => {
        invoice = undefined;
      });
    }
  });
   */

  it('Shipments menu should load Shipments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('shipment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Shipment').should('exist');
    cy.url().should('match', shipmentPageUrlPattern);
  });

  describe('Shipment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(shipmentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Shipment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/shipment/new$'));
        cy.getEntityCreateUpdateHeading('Shipment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', shipmentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/shipments',
          body: {
            ...shipmentSample,
            invoice: invoice,
          },
        }).then(({ body }) => {
          shipment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/shipments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/shipments?page=0&size=20>; rel="last",<http://localhost/api/shipments?page=0&size=20>; rel="first"',
              },
              body: [shipment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(shipmentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(shipmentPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Shipment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('shipment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', shipmentPageUrlPattern);
      });

      it('edit button click should load edit Shipment page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Shipment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', shipmentPageUrlPattern);
      });

      it('edit button click should load edit Shipment page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Shipment');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', shipmentPageUrlPattern);
      });

      it.skip('last delete button click should delete instance of Shipment', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('shipment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', shipmentPageUrlPattern);

        shipment = undefined;
      });
    });
  });

  describe('new Shipment page', () => {
    beforeEach(() => {
      cy.visit(`${shipmentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Shipment');
    });

    it.skip('should create an instance of Shipment', () => {
      cy.get(`[data-cy="trackingCode"]`).type('new');
      cy.get(`[data-cy="trackingCode"]`).should('have.value', 'new');

      cy.get(`[data-cy="date"]`).type('2024-07-22T04:59');
      cy.get(`[data-cy="date"]`).blur();
      cy.get(`[data-cy="date"]`).should('have.value', '2024-07-22T04:59');

      cy.get(`[data-cy="details"]`).type('surf');
      cy.get(`[data-cy="details"]`).should('have.value', 'surf');

      cy.get(`[data-cy="invoice"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        shipment = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', shipmentPageUrlPattern);
    });
  });
});
