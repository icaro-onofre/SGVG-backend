function calculateAge(birthDate){
    const date = new Date(birthDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const today = new Date()
    const currentYear = today.getFullYear()
    const birthday = new Date(`${currentYear}-${month}-${day}`)
    birthday.setUTCHours(3)
    birthday.setUTCMinutes(0)
    birthday.setUTCSeconds(0)

    console.log("Date:", date)
    console.log("Today:", today)
    console.log("Bday:", birthday)

    return today > birthday ? currentYear - year : currentYear - year - 1
}

export default calculateAge