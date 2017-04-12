const width = 360;
const height = 266;
const padding = 15;

function makeDiv(x, y, w, h) {
  var div = document.createElement('div');
  div.style.left = (x * (width + padding) + padding) + 'px';
  div.style.top = (y * (height + padding) + padding) + 'px';
  div.style.width = ((w - 1) * (width + padding) + width) + 'px';
  div.style.height = ((h - 1) * (height + padding) + height) + 'px';
  return div;
}

let totalRows = 0;
let totalColumns = 0;
let grid = document.querySelector('.grid');
let cells = [
  [1, 1],
  [1, 2],
  [1, 2],
  [2, 2],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1]
];

let imageUrls = [
    './img/fall.png',
    './img/juno_nose.png',
    './img/multnomah_falls.png',
    './img/voodoo_donuts.png',
    './img/yosemite.png',
    './img/yosemite_river.png',
    './img/sun_bathe.png',
    './img/bridge.png',
]
var boxes = layout(cells, 3);

boxes.forEach(([x, y, w, h]) => {
  totalRows = Math.max(y + h, totalRows);
  totalColumns = Math.max(x + w, totalColumns);
  grid.appendChild(makeDiv(x, y, w, h));
});

grid.style.width = ((width + padding) * totalColumns + padding) + 'px';
grid.style.height = ((height + padding) * totalRows + padding) + 'px';

function layout(sizes, columns) {
  let grid = [];
  let data = [];

  sizes.forEach(([w, h]) => {
    outer: for (let x = 0, y = 0;; x++, x>=columns ? (x = 0, y++) : 0) {
      // If it's too wide, move on...
      if (x && (x + w > columns)) {
        continue outer;
      }
      // Check for collisions
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          if (grid[(x + i) + (y + j) * columns]) {
            continue outer;
          }
        }
      }
      // Mark it
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          grid[(x + i) + (y + j) * columns] = true;
        }
      }
      data.push([x, y, w, h]);
      break outer;
    }
  })
  return data;
}

document.querySelector('.grid').childNodes.forEach((el, idx) => {
  if (idx === 0) {
    return;
  }

  el.style.backgroundImage = 'url(' + imageUrls[idx - 1] + ')';
})
