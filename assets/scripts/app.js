/**
 * Sets environment variable, whether or not
 * this is a DEV environment 
 * @type {Boolean}
 */
var DEV = false;

$(document).ready(function() { 
  var $document = $(document),
      $window = $(window),
      $body = $('body');


  // Define the View
  Driftwood = Backbone.View.extend( {
    /**
     * Container of all our visibile
     * @type object
     */
    el: $('.main'),

    initialize: function() {        

      _.bindAll(this, 'render');

      this.addEventListeners();
      
    },

    run: function() {
      this.ContextMenu = new ContextMenu();
      this.Chat = new Chat();
      this.CanvasManager = new CanvasManager();
      this.Commands = new Commands({CanvasManager:this.CanvasManager});
    },

    addEventListeners: function() {
      //Tabs
      $body.on('click','[data-toggle="tab"]', function() {
        var $this = $(this);
        $body.find($this.closest('[data-tab-panels]').data('tab-panels')).hide();
        $body.find($(this).data('target')).css('display','table-row');
      } );

      //Elastic input
      var scope = this;
      
      //Makes textareas elastic
      $body.find('[data-activate="elastic"]').each( function() {
        scope.dataActivate([this]);
      } );
      //Runs activation toggles
      $body.on('click focus blur','[data-activate]:not([data-on="load"])', function(e) {
        var on = $(this).data('on');
        if( ! on || on.split(',').indexOf(e.type) !== -1 ) {
          scope.dataActivate(this);
        }
      } );
      //Clears a target of its value
      $body.on('click','[data-clear]', function() {
        var $target = $body.find($(this).data('clear'));
        $target.val('');
      })

      //Creates a color picker
      $editorPicker = $body.find('.editor-color')
      $editorPicker.ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
          $editorPicker.val('#' + hex);
          $body.find('.editor').css('background-color', '#' + hex);
        },
        onBeforeShow: function () {
          $(this).ColorPickerSetColor(this.value);
        },
        onChange: function (hsb, hex, rgb) {
          $editorPicker.val('#' + hex);
          $editorPicker.trigger('change');
          $body.find('.editor').css('background-color', '#' + hex);
        }
      });

    },

    dataActivate: function( object ) {
      var $object = $(object),
          activate = $object.data('activate'),
          target = $object.data('target'),
          $target = $body.find(target),
          $value = $object.attr('value') ? $object.attr('value') : $object.html();

      switch( activate ) {
        case 'elastic':
          this.elasticize(object);
          break;
        case 'focus':
          $target.toggleClass('focus');
          break;
        case 'replace':
          $target.html($value);
          break;
      }
    },

    //Makes a textarea elastic
    elasticize: function(a) {
      var b="overflow"+("overflowY" in document.getElementsByTagName("script")[0].style?"Y":""),e=function(h,g,j){if(g.addEventListener){for(var f=0;f<h.length;f++){g.addEventListener(h[f],j,0)}}else{if(g.attachEvent){for(var f=0;f<h.length;f++){g.attachEvent("on"+h[f],j)}}}};for(var c=0;c<a.length;c++){a[c].style[b]="hidden";a[c].__originalRows=a[c].rows;var d=function(f){var h=f.target||f.srcElement||this,g=h.scrollTop;h.scrollTop=1;while(h.scrollTop>0){var j=h.clientHeight,i=true;h.rows++;if(h.clientHeight==j){if(h.style[b]){h.style[b]=""}h.scrollTop=g;return}h.scrollTop=1}if(!i){while(h.scrollTop==0&&h.rows>h.__originalRows){h.rows--;h.scrollTop=1}if(h.scrollTop>0){h.rows++}}if(!h.style[b]){h.style[b]="hidden"}};e(["keyup","paste"],a[c],d);d({target:a[c]})}
    },
 
  } );

  /**
   * Context Menu View
   *
   * Allows us to open our own context menu where ever we want. When 
   * a context menu is opened, an X and Y position must be passed.
   *
   * In order to filter out what menu options are available, 
   */
  ContextMenu = Backbone.View.extend( {
    // Container element
    el: $('body'),
    //Grab the template from the page
    template: _.template($('#contextMenuTemplate').html()),

    initialize: function() {
      _.bindAll(this,'render');
      //Add event listeners
      this.addEventListeners();
    },
    addEventListeners: function() {
      //Creates a context menu
      $body.on('contextmenu','.canvas-wrapper', _.bind( function(e) {
        this.open( {
          x:e.clientX,
          y:e.clientY,
          e: e
        } );
        e.preventDefault();
      }, this ) );
      //Makes sure the context menu gets closed
      $body.on('click', _.bind(this.close,this));
    },
    open: function(options) {
      //Set all our options
      this.options = options;
      this.object = options.object || false;
      this.X = options.x;
      this.Y = options.y;

      //Build the menu, close other menus, render a new one
      this.buildContextMenu();
      this.close();
      this.render();
    },
    buildContextMenu: function() {
      //TODO: Determine what options should be turned on or off
    },
    render: function() {
      $(this.el).append(this.template({}));
      $body.find('.context-menu').css( {
        top: this.Y,
        left: this.X
      } );
    },
    close: function() {
      $body.find('.context-menu').remove();
    }
  } );

  /**
   * Chat
   *
   * Allows us to send, receive, and render chat
   * messages. 
   */
  Chat = Backbone.View.extend( {
    // Container element
    el: $('.panel .chat'),
    //Grab the template from the page
    template: _.template($('#chatMessageTemplate').html()),

    initialize: function() {
      _.bindAll(this,'render');
      //Add event listeners
      this.addEventListeners();
      this.scrollChat(0);
    },
    addEventListeners: function() {
      //Chat enter
      $(this.el).on('keypress','.input textarea', _.bind( function(e) {
        //Enter key, but not shift enter
        if( e.keyCode === 13 && ! e.shiftKey ){
          this.sendMessage(e.target);
          return false;
        }
      }, this ) );
    },

    sendMessage: function(input) {
      var $input = $(input),
          message = $input.val();

      $input.val('')
      //TODO: Send message off to server
      if( message.replace(/\s+/g, ' ') !== '' ) {
        console.log(message);
        this.message = message;
        this.render();

        //Remove the active class after rendered
        $(this.el).find('.messages .active').removeClass('active');
      }
        
    },

    render: function() {
      var $messages = $(this.el).find('.messages'),
          scrollTop = $messages[0].scrollTop,
          scrollHeight = $messages[0].scrollHeight,
          height = $messages.outerHeight();

      $messages.append(this.template({message: this.message}));

      //Were they at the bottom when we added the message?
      //If so, scroll. If not, don't ruin their scroll position
      if( (scrollHeight - scrollTop) == height  ) {
        this.scrollChat(100);
      }
    },

    //Scrolls the chat window
    scrollChat: function( scrollTime ) {
      var scrollTime = (typeof scrollTime === 'undefined') ? 500 : scrollTime,
          $messages = $body.find('.messages'),
          scrollHeight = $messages[0].scrollHeight;
    
      $messages.scrollTo(scrollHeight,scrollTime);
    },
  } );

  /**
   * Command
   *
   * Executes commands, toggles menu items 
   */
  Commands = Backbone.View.extend( {
    // Container element
    el: $('.editor .commands'),

    subMenuDelay: 800,

    initialize: function(options) {
      _.bindAll(this,'render');

      //Set options
      this.options = options;
      this.CanvasManager = options.CanvasManager || new CanvasManager();
      //Add event listeners
      this.addEventListeners();
      //Execute intiial loading command
      this.runInitialCommand();
    },
    addEventListeners: function() {
      var scope = this;
      //Switches the active icon when a dropdown option is selected
      $body.on('click','.commands .dropdown-menu li', function() {
        var $this = $(this),
            icon = $this.find('b')[0].className,
            command = $this.closest('[data-cmd]').data('cmd'),
            value = $this.closest('[data-cmd]').data('cmd-value'),
            $parentIcon = $this.closest('.btn-group').find('.dropdown-toggle b');

        $parentIcon[0].className = icon;
        $parentIcon.closest('[data-cmd]').attr('data-cmd',command);
         $parentIcon.closest('[data-cmd]').attr('data-cmd-value',value);
        $body.find('.commands .btn.active').removeClass('active');
        $parentIcon.parent().addClass('active');
      } );

      //Stop the standard dropdown from happening, we only want the dropdown
      //to open on longpress (but we do want the actual button to be toggled)
      $body.on('click','.commands .dropdown-toggle', function() {
        $(this).button('toggle');
        return false;
      } );
      //Hook into mousedown to fire off our long press test. Sets a timer to
      //show the dropdown menu in X seconds
      $body.on('mousedown','.commands .dropdown-toggle', function(e) {
        var $this = $(this);
        $this.button('toggle');
        scope.commandTimer = window.setTimeout(function () {
          $this.dropdown('toggle');
        }, scope.subMenuDelay );
        e.preventDefault();
      } );
      //Clears the longpress timer and toggles dropdown - if it's open it will stay open
      //and if it's not open it won't open. The bootstrap event toggle happens after this
      //function bubbles, so we toggle it once to the set the opposisite of what we want
      $body.on('mouseup','.commands .dropdown-toggle', function(e) {
        //Clear our longpress timeout 
        clearTimeout(scope.commandTimer);

        var $this = $(this);
        //Makes sure our menu opens/closes properly
        $this.dropdown('toggle');
        //Because of the timing of open, close we actually want to execute the command
        //if the btn-group is reporting it's open (because once this function finishes
        //and bubbles up, the bootstrap event listener will toggle it the other way)
        if( $this.closest('.btn-group').hasClass('open') && $this.attr('data-cmd') ) {
          scope.commandClicked(this);
        }
      } );
      //Simple do command event listener
      $body.on('click','[data-cmd]', function(e) {
        scope.commandClicked(this);
      } );
    },
    //Checks the DOM to see what command is set as active and runs it
    runInitialCommand: function() {
      $body.find('.commands [data-cmd].active').trigger('click');
    },
    commandClicked: function(object) {
      var $this = $(object);
            command = $this.attr('data-cmd'),
            value = $this.attr('data-cmd-value');

      this.doCommand(command,value);
    },
    //Checks our command switch and fires off the command to whatever 
    //controller neds it
    doCommand: function(command,value) {
      console.log('Command:',command,value);
      switch(command) {
        case 'moveCanvas' :
          driftwood.engine.CanvasManager.trigger('moveCanvas',value);
          break;
        case 'selectCanvas' :
          driftwood.engine.CanvasManager.trigger('selectCanvas',value);
          break;
        case 'draw' :
          driftwood.engine.CanvasManager.trigger('draw',value);
          break;
        case 'switchLayer' :
          driftwood.engine.CanvasManager.trigger('switchLayer',value);
          break;
        case 'zoomIn':
          driftwood.engine.CanvasManager.trigger('zoomIn');
          break;
        case 'zoomOut':
          driftwood.engine.CanvasManager.trigger('zoomOut');
          break;
      }
    },
  } );

  /**
   * CanvasManager
   *
   * Handles major canvas interactions, such as dragging/panning,
   * etc
   */
  CanvasManager = Backbone.View.extend( {
    
    canvasMove: false,

    initialLayer: 'map_layer',

    CANVAS_WIDTH: 3000,

    CANVAS_HEIGHT: 3000,

    initialize: function() {
      _.bindAll(this,'render');
      
      //Store reference to our canvas object
      this.canvas = new fabric.Canvas('c');
      //Sset our intial canvas width
      this.canvas.setWidth( this.CANVAS_WIDTH );
      this.canvas.setHeight( this.CANVAS_HEIGHT );

      //Just for now
      //FIXME: The grid should actually be on its own layer
      this.canvas.setOverlayImage('assets/images/grid.svg', this.canvas.renderAll.bind(this.canvas))

      //Just for testing
      //FIXME: Remove or clean up
      /*this._tmp_canvas = new fabric.Canvas('over');
      this._tmp_canvas.setWidth( this.CANVAS_WIDTH );
      this._tmp_canvas.setHeight( this.CANVAS_HEIGHT );
      this._tmp_canvas.calcOffset();
      this._tmp_canvas.renderAll();
      
      this._saved = [];*/

      //Create our drawing utility
      this.drawing = this.drawingUtil.init(this);
      //Zoom utility
      this.zoom = this.zoomUtil.init(this);

      //Add event listeners
      this.addEventListeners();
      
      //Make sure we'll all sized up
      this.on_resize();

      //Set initial layer
      this.switchLayer(this.initialLayer);
    },

    addEventListeners: function() {
      //Backbone View event listeners
      this.on('moveCanvas selectCanvas draw switchLayer', _.bind(this.disableAll,this));
      this.on('moveCanvas', _.bind(this.activateCanvasMove,this));
      this.on('selectCanvas',_.bind(this.activateCanvasSelect,this));
      this.on('draw',_.bind(this.draw,this));
      this.on('switchLayer',_.bind(this.switchLayer,this));
      this.on('zoomIn',this.zoom.In);
      this.on('zoomOut',this.zoom.Out);

      //Window listener
      $window.on('resize',this.on_resize);

      //Canvas events
      this.canvas.on('object:added', _.bind( function(e) {
        var activeObject = e.target,
            currentLayer = this.currentLayer;
        if( ! activeObject.toJSON().layer ) {
          activeObject.toObject = (function(toObject) {
            return function() {
              return fabric.util.object.extend(toObject.call(this), {
                layer: currentLayer,
              });
            };
          })(activeObject.toObject);
          console.log(activeObject.toJSON());
          //this._saved.push(activeObject);
        }
      }, this ) );
    },

    //Make sure the canvas wrapper stays the width of the screen, minus our side panel
    on_resize: function() {
      $body.find('.canvas-wrapper').width($window.width()-$('.panel').outerWidth()).height($window.height());
    },

    //Disables all our different canvas interactions
    disableAll: function() {
      this.disableCanvasMove();
      this.drawing.circle.stopDrawing();
      this.drawing.rectangle.stopDrawing();
      this.canvas.isDrawingMode = false;
      this.canvas.selection = true;
    },

    //Draw something
    draw: function(what) {
      switch(what) {
        case 'free':
          this.canvas.isDrawingMode = true;
          break;
        case 'circle':
          this.drawing.circle.startDrawing();
          break;
        case 'rectangle':
          this.drawing.rectangle.startDrawing();
      }
      
    },

    /**
     * Clears canvas and puts non active layer objects on a different
     * canvas all together
     */
    /*switchLayer: function(layer) {
      this.currentLayer = layer;

      //Clear everything - we're going to load everything
      //from our saved objects array onto the correct canvas
      this._tmp_canvas.clear();
      this.canvas.clear();
      //Go through each object and add it to the correct canvas
      this._saved.forEach( _.bind( function(object) {
        //Not on this later, move to the tmp canvas
        if( object.toJSON().layer !== this.currentLayer ) {
          object.selectable = false;
          object.set('opacity',0.5);
          this.canvas.remove(object);
          this._tmp_canvas.add(object);
        //Is the current layer, so let's interact with it
        } else {
          object.selectable = true;
          object.set('opacity',1);
          this.canvas.add(object);
          this._tmp_canvas.remove(object);
        }
      }, this ) );
      //Make sure everything is rendered
      this._tmp_canvas.renderAll();
      this.canvas.deactivateAll().renderAll();
    },*/

    switchLayer: function(layer) {
      this.currentLayer = layer;
      //Grab objects
      var objects = this.canvas.getObjects();
      //Go through each object and add it to the correct canvas
      objects.forEach( _.bind( function(object) {
        //Not on this later, move to the tmp canvas
        if( object.toJSON().layer !== this.currentLayer ) {
          object.selectable = false;
          object.set('opacity',0.5);
        //Is the current layer, so let's interact with it
        } else {
          object.selectable = true;
          object.set('opacity',1);
        }
      }, this ) );
      //Make sure everything is rendered
      this.canvas.deactivateAll().renderAll();
    },

    //Allows items on the canvas to be selected
    activateCanvasSelect: function() {
      this.canvas.selection = true;
    },

    /**
     * Canvas Move
     *
     * These functions handle moving the canvas. One function to activate,
     * one to deactivate, what to start the move, one to stop the move, and another
     * to actually move
     *
     * The moving actually takes place on the editor overlay, and we just
     * adjust the scroll height/width to make it look like we are panning
     */
    //Says we can move a canvas, declares event listeners
    activateCanvasMove: function() {
      $body.find('.editor .overlay').show();
      $body.on('mousedown.canvasPan','.canvas-wrapper', _.bind( this.startCanvasMove, this ) );
      $body.on('mouseup.canvasPan', _.bind( this.stopCanvasMove, this ) );
      $body.on('mousemove.canvasPan','.canvas-wrapper', _.bind( this.moveCanvas, this ) );
    },
    //Removes event listeners for the canvas move
    disableCanvasMove: function() {
      $body.off('.canvasPan');
      $body.find('.editor .overlay').hide();
    },
    
    startCanvasMove: function(e) {
      this.canvasMove = true;
      this.X = e.clientX;
      this.Y = e.clientY;
      this.scrollLeft = $body.find('.canvas-wrapper')[0].scrollLeft;
      this.scrollTop = $body.find('.canvas-wrapper')[0].scrollTop;
    },

    stopCanvasMove: function() {
      $body.find('.overlay').css({
        top: 0,
        left: 0
      } );
      this.canvasMove = false;
    },
    moveCanvas: function(e) {
      if( this.canvasMove ) {
        var moveY = e.clientY - this.Y,
            moveX = e.clientX - this.X;

        $body.find('.editor .overlay').css({
          top: moveY,
          left: moveX
        } );
        if( this.scrollLeft - moveX > 0 ) {
          $body.find('.canvas-wrapper').scrollLeft( this.scrollLeft + (- moveX) );
        }
        if( this.scrollTop - moveY > 0 ) {
          $body.find('.canvas-wrapper').scrollTop( this.scrollTop + (- moveY) ) ;
        }
      }
      e.preventDefault();
    },

    zoomUtil: {
      //Init function. Needs context to our global object
      init: function(context) {
        canvas = context.canvas;
        SCALE_FACTOR = 1.2;
        canvasScale = 1;
        return {
          In: function(event) {
            // TODO limit the max canvas zoom in
            canvasScale: canvasScale * SCALE_FACTOR,
            
            canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
            canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
            
            var objects = canvas.getObjects();
            for (var i in objects) {
                var scaleX = objects[i].scaleX;
                var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;
                
                var tempScaleX = scaleX * SCALE_FACTOR;
                var tempScaleY = scaleY * SCALE_FACTOR;
                var tempLeft = left * SCALE_FACTOR;
                var tempTop = top * SCALE_FACTOR;
                
                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;
                
                objects[i].setCoords();
            }
                
            canvas.renderAll();
          },
          Out: function() {
            console.log('zoom out');
            // TODO limit max cavas zoom out
            canvasScale = canvasScale / SCALE_FACTOR;
            
            canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
            canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
            
            var objects = canvas.getObjects();
            for (var i in objects) {
                var scaleX = objects[i].scaleX;
                var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;
            
                var tempScaleX = scaleX * (1 / SCALE_FACTOR);
                var tempScaleY = scaleY * (1 / SCALE_FACTOR);
                var tempLeft = left * (1 / SCALE_FACTOR);
                var tempTop = top * (1 / SCALE_FACTOR);

                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;

                objects[i].setCoords();
            }
            
            canvas.renderAll();
          }
        };
      },
        
    },
    /**
     * Allows us to draw different things. Has a utility for free drawing
     * a circle and a rectangle.
     */
    drawingUtil: {
      //Init function. Needs context to our global object
      init: function(context) {
        this.canvas = context.canvas;
        this.circle = this.circleUtil(this.canvas);
        this.rectangle = this.rectangleUtil(this.canvas);
        return this;
      },
      /**
       * Draw Circle
       *
       * These functions help draw a circle. Like always, one to activate/deactivate/
       * start/stop/draw
       */
      circleUtil: function(canvas) {
        return {
          canvas: canvas,

          color: 'green',

          //Sets variables and adds events to the mouse
          startDrawing: function(canvas) {
            this.canvas.selection = false;
            _.bindAll(this,'startCircleDraw','stopCircleDraw','drawCircle');   
            this.canvas.on('mouse:down', this.startCircleDraw);
            this.canvas.on('mouse:up', this.stopCircleDraw);
            this.canvas.on('mouse:move', this.drawCircle);

          },
          //Disable drawing
          stopDrawing: function() {
            this.canvas.off('mouse:down', this.startCircleDraw);
            this.canvas.off('mouse:up', this.stopCircleDraw);
            this.canvas.off('mouse:move', this.drawCircle);
          },
          //Set our intial circle. We're actually creating an Ellipse
          //with some intial qualities and then making it bigger
          startCircleDraw: function(event) {
            //Where did the mouse click start
            this.startX = event.e.x;
            this.startY = event.e.y;
            //Don't start if this is already an object
            if( ! event.target ){
              //Create our "circle"
              var object = new fabric.Ellipse({
                left:   event.e.x,
                top:    event.e.y,
                originX: 'left',
                originY: 'top',
                rx: 0,
                ry: 0,
                selectable: false,
                stroke: this.color,
                strokeWidth: 2,
                fill: ''
              });

              //Add it to the canvas
              this.canvas.add(object);
              //this.canvas.setActiveObject(object,event);
              this.circle = object;
            }
          },
          //Stops drawing the circle (they let up on the mouse)
          stopCircleDraw: function(event) {
            if( this.circle ){
              // Remove object if mouse didn't move anywhere
              if(event.e.x == this.startX && event.e.y == this.startY ){
                this.canvas.remove(this.circle);
              }
              
              this.circle.selectable = true;
              this.circle.setCoords();
              this.circle = null;
            }
          },
          //Technically the circle is already drawn. Here we are just
          //making it bigger
          drawCircle: function(event) {
            if( this.circle ){
              // Resize object as mouse moves
              var width = (event.e.x - this.startX),
                  height = (event.e.y - this.startY),
                  originX = width > 0 ? 'left' : 'right',
                  originY = height > 0 ? 'top' : 'bottom';

              this.circle.set({
                rx: Math.abs(width)/2,
                ry: height/2,
                originX: originX,
                originY: originY,
                width: Math.abs(width), //Always positive
                height: Math.abs(height) //Always positive
              }).adjustPosition(originX); //Set our origin point
              //Render everything
              this.canvas.renderAll();
            }
          },
        }//END return
      },//END Circle UTIL
      /**
       * Draw Rectangle
       *
       * These functions help draw a rectangle. Like always, one to activate/deactivate/
       * start/stop/draw
       */
      rectangleUtil: function(canvas) {
        return {
          canvas: canvas,

          color: 'green',

          //Sets variables and adds events to the mouse
          startDrawing: function(canvas) {
            this.canvas.selection = false;
            _.bindAll(this,'startRectangleDraw','stopRectangleDraw','drawRectange');   
            this.canvas.on('mouse:down', this.startRectangleDraw);
            this.canvas.on('mouse:up', this.stopRectangleDraw);
            this.canvas.on('mouse:move', this.drawRectange);

          },
          //Disable drawing
          stopDrawing: function() {
            this.canvas.off('mouse:down', this.startRectangleDraw);
            this.canvas.off('mouse:up', this.stopRectangleDraw);
            this.canvas.off('mouse:move', this.drawRectange);
          },
          //Set our intial circle. We're actually creating an Ellipse
          //with some intial qualities and then making it bigger
          startRectangleDraw: function(event) {
            //Where did the mouse click start
            this.startX = event.e.x;
            this.startY = event.e.y;
            //Don't start if this is already an object
            if( ! event.target ){
              //Create our "circle"
              var object = new fabric.Rect({
                left:   event.e.x,
                top:    event.e.y,
                originX: 'left',
                originY: 'top',
                width: 0,
                height: 0,
                selectable: false,
                stroke: this.color,
                strokeWidth: 2,
                fill: ''
              });

              //Add it to the canvas
              this.canvas.add(object);
              //this.canvas.setActiveObject(object,event);
              this.rectangle = object;
            }
          },
          //Stops drawing the circle (they let up on the mouse)
          stopRectangleDraw: function(event) {
            if( this.rectangle ){
              // Remove object if mouse didn't move anywhere
              if(event.e.x == this.startX && event.e.y == this.startY ){
                this.canvas.remove(this.rectangle);
              }
              
              this.rectangle.selectable = true;
              this.rectangle.setCoords();
              this.rectangle = null;
            }
          },
          //Technically the circle is already drawn. Here we are just
          //making it bigger
          drawRectange: function(event) {
            if( this.rectangle ){
              // Resize object as mouse moves
              var width = (event.e.x - this.startX),
                  height = (event.e.y - this.startY),
                  originX = width > 0 ? 'left' : 'right',
                  originY = height > 0 ? 'top' : 'bottom';

              this.rectangle.set({
                originX: originX,
                originY: originY,
                width: Math.abs(width), //Always positive
                height: Math.abs(height) //Always positive
              }).adjustPosition(originX); //Set our origin point
              //Render everything
              this.canvas.renderAll();
            }
          },
        }//END return
      }//END Circle UTIL
    },//ND Drawing UTIL

  } );

  var driftwood = {
    engine: new Driftwood()
  }
  driftwood.engine.run();
});