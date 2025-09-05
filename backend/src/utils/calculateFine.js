export function calculateFine(dueDate){
    const finePerHour=0.1  //10 paisa
    const today=new Date()

    if(today>dueDate){
        const lateHours=Math.floor((today-dueDate)/(1000*60*60))
        const fine=lateHours*finePerHour
        return fine
    }
    return 0
}