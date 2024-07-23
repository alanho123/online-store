import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProductCategoryService from './product-category.service';
import { type IProductCategory } from '@/shared/model/product-category.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProductCategory',
  setup() {
    const { t: t$ } = useI18n();
    const productCategoryService = inject('productCategoryService', () => new ProductCategoryService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const productCategories: Ref<IProductCategory[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveProductCategorys = async () => {
      isFetching.value = true;
      try {
        const res = await productCategoryService().retrieve();
        productCategories.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveProductCategorys();
    };

    onMounted(async () => {
      await retrieveProductCategorys();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IProductCategory) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeProductCategory = async () => {
      try {
        await productCategoryService().delete(removeId.value);
        const message = t$('storeApp.productCategory.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveProductCategorys();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      productCategories,
      handleSyncList,
      isFetching,
      retrieveProductCategorys,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeProductCategory,
      t$,
    };
  },
});
