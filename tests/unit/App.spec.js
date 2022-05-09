import { shallowMount } from "@vue/test-utils";
import App from '@/App.vue';
import SearchBox from '@/components/SearchBox.vue';

jest.mock('@apollo/client/core');
jest.mock('../../src/apolloConfig/apolloClient');

describe('App.vue', () => {
    let wrapper;
    const user = {
        id: 9,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '(775)976-6794 x41206',
        company: {
            name: 'Alkimii',
            catchPhrase: 'Integrated Applications made by our hotel people for your hotel people.'
        }
    };
    const queryMock = {
        data: {
            users: {
                data: [user]
            }
        }
    };

    beforeEach(() => {
        wrapper = shallowMount(App);
        jest.spyOn(wrapper.vm.apollo.client, 'query').mockReturnValue(queryMock);
    });

    it('should render the component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should fetchUsers on search', async() => {
        const textToSearch = 'foo';
        wrapper.findComponent(SearchBox).trigger('search', [textToSearch]);
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.textToSearch[0]).toBe(textToSearch);
        expect(wrapper.vm.users.length).toEqual(1);
    });

    it('should fetchNextUser on scroll', async() => {
        wrapper.setData({
            textToSearch: 'foo',
            users: [user],
        });
        expect(wrapper.vm.users.length).toEqual(1);
        mockScrollEvent();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.users.length).toEqual(2);
    });

    function mockScrollEvent() {
        window.innerHeight = 50;
        Object.defineProperty(document.documentElement, 'offsetHeight', { value: 100 });
        document.documentElement.scrollTop = 50;
        window.dispatchEvent(new CustomEvent('scroll'));
    }
});