import moment from 'moment';
import Swal from "sweetalert2";

export const formatUTCTime = (utcTime, formatString) => {
  return moment(utcTime).format(formatString);
};

// export const formatDate = (value) => {
//   const date = new Date(value);
//   const day = date.toLocaleString('default', { day: '2-digit' });
//   const month = date.toLocaleString('default', { month: 'short' });
//   const year = date.toLocaleString('default', { year: 'numeric' });
//   const hours = date.toLocaleString('default', { hour: '2-digit', hour12: false });
//   const minutes = date.toLocaleString('default', { minute: '2-digit' });
//   return `${day}-${month}-${year} ${hours}:${minutes}`;
// };

// Convert Date and Time from UTC timestamp
export const formatDate = (value) => {
  const date = new Date(value);

  // Default to Australia time zone
  let options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Australia/Sydney'
  };

  // Detect user's locale and adjust timezone if needed
  const userLocale = navigator.language;
  if (userLocale.includes('nz') || userLocale.includes('NZ')) {
      options.timeZone = 'Pacific/Auckland'; // New Zealand time zone
  }

  // Format date components
  const day = date.toLocaleString(userLocale, { day: '2-digit', timeZone: options.timeZone });
  const month = date.toLocaleString(userLocale, { month: 'short', timeZone: options.timeZone });
  const year = date.toLocaleString(userLocale, { year: 'numeric', timeZone: options.timeZone });
  const hours = date.toLocaleString(userLocale, { hour: '2-digit', hour12: false, timeZone: options.timeZone });
  const minutes = date.toLocaleString(userLocale, { minute: '2-digit', timeZone: options.timeZone });

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};


// Toast notification
export const showToast = (title, icon) => {
    const iconColors = {
        success: '#198754',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
        question: '#0d6efd',
    };
  
    Swal.fire({
        toast: true,
        title: title,
        icon: icon,
        position: 'bottom-end',
        color: iconColors[icon] || '',
        showConfirmButton: false,
        width: '320px',
        padding: '10px 5px',
        timer: 4000,
        timerProgressBar: true,
    });
};

// Alert notification
export const showAlert = (title, text, icon) => {
    const iconColors = {
        success: '#A5DC86',
        error: '#F27474',
        warning: '#F8BB86',
        info: '#3FC3EE',
        question: '#87ADBD',
    };
  
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        position: 'bottom-end',
        color: iconColors[icon] || '',
        showConfirmButton: false,
        width: '320px',
        padding: '10px 5px',
        timer: 4000,
        timerProgressBar: true,
    });
};


// Confirm notification
export const showConfirm = (title, text, icon) => {
    const iconColors = {
      success: '#A5DC86',
      error: '#F27474',
      warning: '#F8BB86',
      info: '#3FC3EE',
      question: '#87ADBD',
    };
  
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      position: 'bottom-end',
      color: iconColors[icon] || '',
      showConfirmButton: false,
      width: '320px',
      padding: '10px 5px',
      timer: 4000,
      timerProgressBar: true,
    });
};
  
