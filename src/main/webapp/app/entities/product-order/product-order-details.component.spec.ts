/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import ProductOrderDetails from './product-order-details.vue';
import ProductOrderService from './product-order.service';
import AlertService from '@/shared/alert/alert.service';

type ProductOrderDetailsComponentType = InstanceType<typeof ProductOrderDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const productOrderSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('ProductOrder Management Detail Component', () => {
    let productOrderServiceStub: SinonStubbedInstance<ProductOrderService>;
    let mountOptions: MountingOptions<ProductOrderDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      productOrderServiceStub = sinon.createStubInstance<ProductOrderService>(ProductOrderService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          productOrderService: () => productOrderServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        productOrderServiceStub.find.resolves(productOrderSample);
        route = {
          params: {
            productOrderId: '' + 123,
          },
        };
        const wrapper = shallowMount(ProductOrderDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.productOrder).toMatchObject(productOrderSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        productOrderServiceStub.find.resolves(productOrderSample);
        const wrapper = shallowMount(ProductOrderDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
