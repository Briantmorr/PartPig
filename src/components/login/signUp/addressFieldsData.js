import states from '../../tools/states';

const inputs = [
    {
        label:'First Name',
        type:'text',
        placeholder:'First Name',
        name:'first_name',
        width: '31%',
        disabled: false,
        required: true
    },
    {
        label:'Middle Name',
        type:'text',
        placeholder:'Middle Name',
        name:'middle_name',
        width: '31%',
        disabled: false,
        required: false
    },
    {
        label:'Last Name',
        type:'text',
        placeholder:'Last Name',
        name:'last_name',
        width: '31%',
        disabled: false,
        required: true
    },
    {
        label:'Address',
        type:'text',
        placeholder:'Address',
        name:'street_address',
        width: '48%',
        disabled: false,
        required: true
    },
    {
        label:'Apt/Unit',
        type:'text',
        placeholder:'Apt/Unit (Optional)',
        name:'apt_suite',
        width: '28%',
        disabled: false,
        required: false
    },
    {
        label:'Country',
        type:'text',
        placeholder:'Country',
        name:'country',
        width: '17%',
        disabled: true,
        required: true
    },
    {
        label:'Zip Code',
        type:'text',
        placeholder:'Zip Code',
        name:'zipcode',
        width: '34%',
        disabled: false,
        required: true
    },
    {
        label:'City',
        type:'text',
        placeholder:'City',
        name:'city',
        width: '34%',
        disabled: false,
        required: true
    },
    {
        label:'State',
        type:'select',
        placeholder:'State',
        name:'state_abbr',
        width: '26%',
        disabled: false,
        required: true,
        list: states
    },
    {
        label:'Phone Number',
        type:'text',
        placeholder:'Phone Number',
        name:'phone_number',
        width: '47%',
        disabled: false,
        required: false
    },
]

export default inputs;