import { shallowMount } from "@vue/test-utils";
import SearchBox from '@/components/SearchBox.vue'

describe('SearchBox.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(SearchBox);
    });

    it('should render the component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should emit a search event after typing something', () => {
        const typedValue = 'john';
        const inputElement = wrapper.find('.search-box');
        wrapper.setData({ textToSearch: typedValue });
        inputElement.trigger('keyup');
        expect(wrapper.emitted().search[0][0]).toEqual(typedValue);
    });
});