const inputs = [
    {
        label:'Part Name',
        type:'text',
        placeholder:'Part Name',
        name:'part_name',
        width: '47%',
        disabled: false,
        required: true
    },
    {
        label:'Part Number',
        type:'text',
        placeholder:'Part Number',
        name:'part_number',
        width: '46%',
        disabled: false,
        required: false
    },
    {
        label:'Brand',
        type:'text',
        placeholder:'Brand',
        name:'brand',
        width: '22%',
        disabled: false,
        required: false
    },    
    {
        label:'Price',
        type:'number',
        placeholder:'Price',
        name:'price_usd',
        width: '23%',
        disabled: false,
        required: true
    },
    {
        label:'Condition',
        type:'select',
        placeholder:'Condition (Optional)',
        name:'part_condition',
        width: '22%',
        disabled: false,
        required: true,
        list: [['acceptable','1'],['good','2'],['very good','3'],['like new','4'],['new','5']]
    },
    {
        label:'Category',
        type:'select',
        placeholder:'Category',
        name:'category_id',
        width: '23%',
        disabled: false,
        required: true,
        list:[['engine',1],['suspension',2],['brakes',3],['drivetrain',4],['interior',5],['exterior',6],['wheels and tires',7],['other',8]]
    },
    {
        label:'Description',
        type:'textarea',
        placeholder:'Description',
        name:'description',
        width: '96%',
        disabled: false,
        required: false
    }
];

export default inputs;

