import { shallowMount } from "@vue/test-utils";
import UsersList from '@/components/UsersList.vue'

describe('UsersList.vue', () => {
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
    }

    beforeEach(() => {
        wrapper = shallowMount(UsersList, {
            props: { users: [user, user] }
        });
    });

    it('should render the component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});