import format from 'date-fns/format'
import { it as locale_it } from 'date-fns/esm/locale'

export const formatDate = (date) => {
  try {
    const dateObj = new Date(date)

    if (dateObj && dateObj instanceof Date) {
      return format(dateObj, 'dd/MM/yyyy', { locale: locale_it })
    }
  } catch (e) {
    console.error(e)
    return date
  }
}
