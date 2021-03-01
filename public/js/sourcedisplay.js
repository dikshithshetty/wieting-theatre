function sourcedisplay(id) {

    $.ajax({url: "/api/source/" + id + ".json", success: function(result){
        //$("#raw").html(JSON.stringify(result));

        var titleTable = $('<table></table>').addClass('page_title_table').addClass('table').addClass('table-condensed').addClass('table-bordered').addClass('table-striped');
        titleTable.append('<tr><th class="page_title">Source: ' + result.title + '</th></tr>');
        $('#display').append(titleTable);

        var fieldTable = $('<table></table>').attr('id', 'source').addClass('table').addClass('table-condensed').addClass('table-bordered').addClass('table-striped');
        fieldTable.append('<tr><th>Field</th><th>Data</th></tr>');
        fieldTable.append('<tr><th>ID</th><td>' + result.id + '</td></tr>');
        if (result.author) {
            fieldTable.append('<tr><th>Author</th><td>' + result.author + '</td></tr>');
        }
        if (result.title) {
            fieldTable.append('<tr><th>Title</th><td>' + result.title + '</td></tr>');
        }
        if (result.publication) {
            fieldTable.append('<tr><th>Publication Facts</th><td>' + result.publication + '</td></tr>');
        }
        if (result.file) {
            var files = '<tr><th>Files</th><td>';
            var l = result.file.length;
            for (var i = 0; i < l; i++) {
                files += result.file[i] + '<br />';
            }
            files += '</td></tr>';
            fieldTable.append(files);
        }
        fieldTable.append('<tr><th>Reference</th><td>' + result.ref + '</td></tr>');
        if (result.note) {
            fieldTable.append('<tr><th>Notes</th><td>' + result.note + '</td></tr>');
        }
        $('#display').append(fieldTable);

        if (result.citations)  {
            var citationTable =  $('<table></table>').attr('id', 'citations').addClass('table').addClass('table-condensed').addClass('table-bordered').addClass('table-striped');
            citationTable.append('<tr><th>Citation</th><th>Referenced By</th></tr>');
            for (var citation in result.citations) {
                var citationRow = '<tr><th>' + (citation=='' ? '[No citation text]' : citation) + '</th><td>';
                if (result.citations[citation].individuals) {
                    for (var id in result.citations[citation].individuals) {
                        citationRow += '<a href="/' + result.citations[citation].individuals[id].id + '/">' + result.citations[citation].individuals[id].name + '</a> (' + result.citations[citation].individuals[id].birth + ' - ' + result.citations[citation].individuals[id].death + ')' + '<br />';
                    }
                }
                citationRow += '<br /></td></tr>'
                citationTable.append(citationRow);
            }
            $('#display').append(citationTable);

        }
    }});
}

