import _ from 'lodash'

export const getValue = (object: any, string: string, defaultValue =  '') => {
  return _.get(object, string, defaultValue)
}

export const getColorFromPercentage = (p: number) => {
    if (p < 15) {
        return 'green'
    }
    if (p < 30) {
        return 'yellow'
    }
    if (p < 60) {
        return 'orange'
    }
    return 'red'
}

