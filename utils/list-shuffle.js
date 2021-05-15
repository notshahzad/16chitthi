list1 = [{name : 'aam' , value : 0},
{name : 'jaam' , value : 0},      
{name : 'kaju' , value : 0},
{name : 'badam' , value : 0}
]
list2 = []
final_list = []
for(j=0;j<4;j++){
    for(i=0;i<4;i++){
        random = Math.floor(Math.random() * 4)
        if(list1[random].value<4){
            console.log(random)
            list1[random].value+=1
            console.log(list1[random])
            list2.push(list1[random].name)
        }else{
             i--
        }
    }
    final_list.push(list2)
    list2 = []
}
console.log(final_list)