function retornaBackground(cor) {
  switch(cor) {
      case 0:
          return '';
      case 1:
          return 'aqua'
      case 2:
          return 'rgb(91, 15, 163)';
      case 3:
          return 'yellow';
      case 4:
          return 'rgb(255, 115, 0)';
      case 5:
          return 'rgb(85, 85, 85)';
      case 6:
          return 'rgb(119, 133, 195)';
      case 7:
          return 'green';
      case 8:
          return 'red';
      case 9:
          return 'saddlebrown';
      case 10:
          return 'blue';
      case 11:
          return 'lime';
      case 12:
          return 'rgb(197, 116, 116)';
  }
}

export {retornaBackground}