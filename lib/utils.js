export function generateID() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var idLength = 22;
  var id = '';
  for (var i = 0; i < idLength; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}