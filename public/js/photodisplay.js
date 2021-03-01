function photodisplay(id) {

    $.ajax({url: "/api/photo/" + id + ".json", success: function(result){
        //$("#raw").html(JSON.stringify(result));

        var photoPage = $('<div></div>').attr('id', 'photopage');
        var photoPageTitle = $('<div></div>').attr('id', 'photopage_title');
        var imageContainer = $('<div></div>').addClass('center_img_container');
        var centerImage =  $('<div></div>').addClass('center_img');
        imageContainer.append(centerImage);
        var photoPageList = $('<div></div>').attr('id', 'photopage_linklist');
        photoPage.append(photoPageTitle).append(imageContainer).append(photoPageList);

        photoPageTitle.append('<p>' + result.title + '</p>');

        var image = $('<img></img>').attr('src', '/images/photos/' + result.file).addClass('lead_photo_full');
        centerImage.append(image);

        var fieldTable = $('<table></table>').attr('id', 'source').addClass('table').addClass('table-condensed').addClass('table-bordered').addClass('table-striped');
        fieldTable.append('<tr><th>Field</th><th>Data</th></tr>');
        //fieldTable.append('<tr><th>ID</th><td>' + result.id + '</td></tr>');
        fieldTable.append('<tr><th>File</th><td>' + result.file + '</td></tr>');
        fieldTable.append('<tr><th>Title</th><td>' + result.title + '</td></tr>');
        if (result.description) {
            fieldTable.append('<tr><th>Description</th><td>' + result.description.replace(/(?:\r\n|\r|\n)/g, '<br />')  + '</td></tr>');
        }
        if (result.people) {
            var peopleRow = '<tr><th>People</th><td>';
            var l = result.people.length;
            for (var i = 0; i < l; i++) {
                peopleRow += '<a href="/' + result.people[i].id + '/">' + result.people[i].name + '</a> (' + result.people[i].birth + ' - ' + result.people[i].death + ')<br />';
            }
            peopleRow += '</td></tr>';
            fieldTable.append(peopleRow);
        }
        if (result.families) {
            var familyRow = '<tr><th>Families</th><td>';
            var l = result.families.length;
            for (var i = 0; i < l; i++) {
                familyRow += '<a href="/' + result.families[i].id + '/">' + result.families[i].title + '</a>' +  (result.families[i].married ? ' (' + result.families[i].married+ ')' : '') + '<br />';
            }
            familyRow += '</td></tr>';
            fieldTable.append(familyRow);
        }
        if (result.notes) {
            var l = result.notes.length;
            var noteRow ='';
            for (var i = 0; i < l; i++) {
                if (i == 0) {
                    noteRow += '<tr><th rowspan="' + l + '">Notes</th>';
                } else {
                    noteRow += '<tr>';
                }
                noteRow += '<td>' + result.notes[i].replace(/(?:\r\n|\r|\n)/g, '<br />') + '</td></tr>';
                fieldTable.append(noteRow);
            }
        }
        photoPage.append(fieldTable);

        $('#display').append(photoPage);
    }});
}

