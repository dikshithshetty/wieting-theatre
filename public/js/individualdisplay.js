function individualdisplay(id) {

    $.ajax({url: "/api/individual/" + id + ".json", success: function(result){
        //$("#raw").html(JSON.stringify(result));

        var person = idrisUtil.createDiv('parents');
        person.append(idrisUtil.createFigureFromIndividualReferenceMale(result.ref))
        $('#display').append(person);

        if (result.attributes) {
            var attrTable = idrisUtil.createTable('attributes');
            attrTable.append('<tr><th colspan="3" class="table_header">Personal Information</th></tr>');
            attrTable.append('<tr><th>Date</th><th colspan="2">Information</th></tr>');
            attrTable.append('<tr><th></th><th>Sex</th><td>' + result.ref.sex + '</td></tr>');
            var l = result.attributes.length;
            for (var i = 0; i < l; i++) {
                var attrRow = '<tr><th>' + result.attributes[i].date + '</th><th>' + result.attributes[i].name + '</th><td>' + result.attributes[i].value + ' ' + result.attributes[i].place;
                if (result.attributes[i].citations) {
                    var m = result.attributes[i].citations.length;
                    for (var j = 0; j < m; j++) {
                        attrRow += ' <sup>[' + result.attributes[i].citations[j] + ']</sup>'
                    }
                }
                if (result.attributes[i].notes) {
                    var n = result.attributes[i].notes.length;
                    for (var k = 0; k < n; k++) {
                        attrRow += '<br /><br />' + result.attributes[i].notes[k].replace(/(?:\r\n|\r|\n)/g, '<br />');
                    }
                }
                attrRow += '</td></tr>';
                attrTable.append(attrRow);
            }
            $('#display').append(attrTable);
        }

        if (result.events) {
            var eventTable = idrisUtil.createTable('events');
            eventTable.append('<tr><th colspan="3" class="table_header">Life Events</th></tr>');
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

        if (result.notes) {
            var noteTable = idrisUtil.createTable('notes');
            noteTable.append('<tr><th class="table_header">Notes</th></tr>');
            var l = result.notes.length;
            for (var i = 0; i < l; i++) {
                var noteRow = '<tr><td>' + result.notes[i].replace(/(?:\r\n|\r|\n)/g, '<br />') + '</td></tr>';
                noteTable.append(noteRow);
            }
            $('#display').append(noteTable);
        }

        if (result.family) {
            var l = result.family.length;
            for (var i = 0; i < l; i++) {
                var familyDiv = idrisUtil.createDiv().addClass('family');
                var familyHeadingTable = idrisUtil.createTable().addClass('family_table');
                familyHeadingTable.append('<tr><th colspan="2" class="table_header">Family <a href="/' + result.family[i].id + '/" class="family_view_button">VIEW</a></th></tr>');

                var spouseref;
                if (result.id != result.family[i].father.id) {
                    spouseref = result.family[i].father;
                }
                if (result.id != result.family[i].mother.id) {
                    spouseref = result.family[i].mother;
                }
                if (spouseref) {
                    s = idrisUtil.normalizeIndividualReference(spouseref);
                    familyHeadingTable.append('<tr><th>Spouse</th><td><div class="index_image_container"><a href="/' + s.id + '/"><img class="index_image" src="' + s.photo + '" /></a></div><a href="/' + s.id + '/">' + s.name + '</a> (' + s.birth + ' - ' + s.death + ')</td></tr>');
                }

                if (result.family[i].children) {
                    var cl = result.family[i].children.length;
                    if (cl > 0) {
                        for (var ci = 0; ci < cl; ci++) {
                            c = idrisUtil.normalizeIndividualReference(result.family[i].children[ci]);
                            var childRow = "<tr>";
                            if (ci == 0) {
                                childRow += '<th rowspan="' + cl + '">Children</th>';
                            }
                            childRow += '<td><div class="index_image_container"><a href="/' + c.id + '/"><img class="index_image" src="' + c.photo + '" /></a></div><a href="/' + c.id + '/">' + c.name + '</a> (' + c.birth + ' - ' + c.death + ')</td>';
                            childRow += '</tr>';
                            familyHeadingTable.append(childRow);
                        }
                    }
                }

                familyDiv.append(familyHeadingTable);
                $('#display').append(familyDiv);
            }
        }

        if (result.parentsfamily) {
            var l = result.parentsfamily.length;
            for (var i = 0; i < l; i++) {
                var familyDiv = idrisUtil.createDiv().addClass('family');
                var familyHeadingTable = idrisUtil.createTable().addClass('family_table');
                familyHeadingTable.append('<tr><th colspan="2" class="table_header">Parent\'s Family <a href="/' + result.parentsfamily[i].id + '/" class="family_view_button">VIEW</a></th></tr>');

                var f = idrisUtil.normalizeIndividualReference(result.parentsfamily[i].father);
                familyHeadingTable.append('<tr><th>Father</th><td><div class="index_image_container"><a href="/' + f.id + '/"><img class="index_image" src="' + f.photo + '" /></a></div><a href="/' + f.id + '/">' + f.name + '</a> (' + f.birth + ' - ' + f.death + ')</td></tr>');
                var m = idrisUtil.normalizeIndividualReference(result.parentsfamily[i].mother);
                familyHeadingTable.append('<tr><th>Mother</th><td><div class="index_image_container"><a href="/' + m.id + '/"><img class="index_image" src="' + m.photo + '" /></a></div><a href="/' + m.id + '/">' + m.name + '</a> (' + m.birth + ' - ' + m.death + ')</td></tr>');

                if (result.parentsfamily[i].children) {
                    var cl = result.parentsfamily[i].children.length;
                    if (cl > 0) {
                        for (var ci = 0; ci < cl; ci++) {
                            c = idrisUtil.normalizeIndividualReference(result.parentsfamily[i].children[ci]);
                            var childRow = "<tr>";
                            if (ci == 0) {
                                childRow += '<th rowspan="' + cl + '">Children</th>';
                            }
                            childRow += '<td><div class="index_image_container"><a href="/' + c.id + '/"><img class="index_image" src="' + c.photo + '" /></a></div><a href="/' + c.id + '/">' + c.name + '</a> (' + c.birth + ' - ' + c.death + ')</td>';
                            childRow += '</tr>';
                            familyHeadingTable.append(childRow);
                        }
                    }
                }

                familyDiv.append(familyHeadingTable);
                $('#display').append(familyDiv);
            }
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

