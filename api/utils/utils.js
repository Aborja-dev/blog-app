const findMaxValue = (list, key=null)=>{
    const listArray = typeof list === 'object' 
        ? Object.values(list)
        : list
    const maxValue = Math.max(...listArray)
    return maxValue
}

const validate = (object, rules)=> {
    const keys = Object.keys(rules)
    const validate = {}
    for (const ruleKey in rules) {
        if (Object.hasOwnProperty.call(rules, ruleKey)) {
            validate[ruleKey] = rules[ruleKey](object)
        }
    }
    return validate

}
module.exports = { findMaxValue, validate }