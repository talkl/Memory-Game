# Memory-Game

Want to add your own themes?

1. add Theme folder with the same structure and type of files as the others.
  a. 6 images for easy, 9 images for medium, 12 images for hard
  b. back card image should be "png" type
2. Edit Memory.bindThemesButtons()
  $('#button_name').on('click', function() {
    Memory.themePathName = 'folder_name';
  });
3. edit the html #theme section:
<!--<input id="button_name" class="play-button themes-buttons" type="button" value="theme_name">-->
