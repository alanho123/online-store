import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import CustomerService from './customer.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';
import { type ICustomer, Customer } from '@/shared/model/customer.model';
import { Gender } from '@/shared/model/enumerations/gender.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'CustomerUpdate',
  setup() {
    const customerService = inject('customerService', () => new CustomerService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const customer: Ref<ICustomer> = ref(new Customer());
    const userService = inject('userService', () => new UserService());
    const users: Ref<Array<any>> = ref([]);
    const genderValues: Ref<string[]> = ref(Object.keys(Gender));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveCustomer = async customerId => {
      try {
        const res = await customerService().find(customerId);
        customer.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.customerId) {
      retrieveCustomer(route.params.customerId);
    }

    const initRelationships = () => {
      userService()
        .retrieve()
        .then(res => {
          users.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      firstName: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      lastName: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      gender: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      email: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      phone: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      addressLine1: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      addressLine2: {},
      city: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      country: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      user: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
    };
    const v$ = useVuelidate(validationRules, customer as any);
    v$.value.$validate();

    return {
      customerService,
      alertService,
      customer,
      previousState,
      genderValues,
      isSaving,
      currentLanguage,
      users,
      v$,
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.customer.id) {
        this.customerService()
          .update(this.customer)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('storeApp.customer.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.customerService()
          .create(this.customer)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('storeApp.customer.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
