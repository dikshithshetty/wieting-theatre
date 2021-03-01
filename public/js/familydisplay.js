function familydisplay(id) {

    $.ajax({url: "/api/family/" + id + ".json", success: function(result){
        //$("#raw").html(JSON.stringify(result));

        var titleTable = idrisUtil.createTable('family').addClass('page_title_table');
        titleTable.append('<tr><th class="page_title">Family of:</th></tr>');
        $('#display').append(titleTable);

        var parents = idrisUtil.createDiv('parents');
        parents.append(idrisUtil.createFigureFromIndividualReferenceMale(result.ref.husband))
        parents.append(idrisUtil.createFigureFromIndividualReferenceFemale(result.ref.wife))
        $('#display').append(parents);

        if (result.children) {
            var childrenTable = idrisUtil.createTable('children');
            childrenTable.append('<tr><th class="table_header">Children</th></tr>');
            var childrenRow = $('<tr></tr>');
            var childrenContainer = $('<td></td>').attr('id', 'family_children')
            var l = result.children.length;
            for (var i = 0; i < l; i++) {
                childrenContainer.append(idrisUtil.createFigureFromIndividualReferenceMale(result.children[i])); // Default to male image if we do not know the sex
            }
            childrenRow.append(childrenContainer);
            childrenTable.append(childrenRow);

            $('#display').append(childrenTable);
        }

        if (result.photos) {
            var photos = idrisUtil.createDiv('photos');
            var photoTitleTable = idrisUtil.createTable('photo_title_table').addClass('photos_table');
            photoTitleTable.append('<tr><th class="table_header">Photo Gallery <span id="slideshow_button" class="photo_view_button">VIEW AS SLIDESHOW</span></th></tr>');
            var gallery = $('<section></section>').attr('id', 'photo_gallery');
            var l = result.photos.length;
            for (var i = 0; i < l; i++) {
                gallery.append('<a href="/' + result.photos[i].id + '/"><img class="gallery_photo" src="/images/photos/' + result.photos[i].file + '" alt="' + result.photos[i].title + '" /></a>');
            }
            photos.append(photoTitleTable).append(gallery);
            $('#display').append(photos);

            $('#display').append(idrisUtil.createPhotoSwipeDiv());

            $('#slideshow_button').click(function() {
                var pswpElement = document.querySelectorAll('.pswp')[0];

                // build items array
                var items = []
                var l = result.photos.length;
                for (var i = 0; i < l; i++) {
                    items.push({
                        src: '/images/photos/' + result.photos[i].file,
                        w: result.photos[i].width,
                        h: result.photos[i].height,
                        title: result.photos[i].title
                    });
                }

                // define options (if needed)
                var options = {
                    history: false,
                    focus: false,
                    showAnimationDuration: 0,
                    hideAnimationDuration: 0
                };

                new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options).init();
            });
        }

        if (result.events) {
            var eventTable = idrisUtil.createTable('events');
            eventTable.append('<tr><th colspan="3" class="table_header">Marriage Information</th></tr>');
            eventTable.append('<tr><th>Date</th><th>Event</th><th>Information</th></tr>');
            var l = result.events.length;
            for (var i = 0; i < l; i++) {
                var eventRow = '<tr><th>' + result.events[i].date + '</th><th>' + result.events[i].name + '</th><td>' + result.events[i].value + ' ' + result.events[i].place;
                if (result.events[i].citations) {
                    var m = result.events[i].citations.length;
                    for (var j = 0; j < m; j++) {
                        eventRow += ' <sup>[' + result.events[i].citations[j] + ']</sup>'
                    }
                }
                if (result.events[i].notes) {
                    var n = result.events[i].notes.length;
                    for (var k = 0; k < n; k++) {
                        eventRow += '<br /><br />' + result.events[i].notes[k].replace(/(?:\r\n|\r|\n)/g, '<br />');
                    }
                }
                eventRow += '</td></tr>';
                eventTable.append(eventRow);
            }
            $('#display').append(eventTable);
        }

        if (result.citations) {
            var citationTable = idrisUtil.createTable('citations');
            citationTable.append('<tr><th colspan="2" class="table_header">Source Citations</th></tr>');
            for (var citation in result.citations) {
                var citationRow = '<tr><th class="source_heading">';
                citationRow += result.citations[citation].id +'.</th><td><a href="/' + result.citations[citation].sourceid + '/">' + result.citations[citation].sourceref + '</a>';
                if (result.citations[citation].detail) {
                    citationRow += ', ' + result.citations[citation].detail;
                }
                citationRow += '</td></tr>';
                citationTable.append(citationRow);
            }

            $('#display').append(citationTable);
        }

    }});
}

