/*eslint-env node, jquery */
/*global MakeList*/
/*!
 * SQL In-List Demo Site
 * Plugin for jQuery
 * https://www.netstaffpro.com/
 *
 * Copyright 2015, 2015 Net Staff, LLC and other contributors
 * Released under the MIT license
 *
 * Date: 2015-09-17
 */
'use strict';

function copyToClipboard(text) {
  window.clipboardData.setData('Text', text);
}
$(document).ready(function() {
  // I|O Setup
  var listInput = $('#cainput');
  var viewType = $('input[name="dType"]:checked');
  var convertButton = $('#convert');
  var resetButton = $('#reset');
  var sqlObject;
  // Convert Input to SQL IN List
  // Initialize Variables to
  // Pass Lint Check
  (function initDemo() {
    if (sqlObject && copyToClipboard(null) && viewType) {
      return true;
    } else {
      return false;
    }
  })();
  /** Add LIST RESET HERE */
  function resetList() {
    listInput.removeClass('ready').attr('readonly', false).val('').removeAttr('onclick');
    convertButton.attr('disabled', false);
    $('#addopt').remove();
    $('#notification').empty();
  }

  function listDisplay(vT) {
    resetList();
    listInput.val(sqlObject.displayList(vT));
    listInput.addClass('ready').attr('readonly', true).attr('onclick',
      'copyToClipboard(this.value)');
    convertButton.attr('disabled', true);
    $('#inputopt').prepend(
      '<div id="addopt" style="margin-bottom:20px;">Additional Options: <button class="button" id="duplicates">Remove Duplicates</button> <button id="rmfirst" class="button">Remove First Item</button></div>'
    );
    $('#notification').append('Click text area to copy to clipboard');
  }
  $('input[name="dType"]').on('click', function() {
    var vT = $('input[name="dType"]:checked');
    if (sqlObject !== undefined) {
      listDisplay(vT.val());
    }
  });
  convertButton.on('click', function() {
    var vT = $('input[name="dType"]:checked');
    sqlObject = new MakeList(listInput.val());
    listDisplay(vT.val());
  });
  resetButton.on('click', function() {
    if (sqlObject !== undefined) {
      sqlObject = undefined;
    }
    resetList();
  });
  $('body').on('click', '#duplicates', function() {
    var vT = $('input[name="dType"]:checked');
    if (sqlObject !== undefined) {
      sqlObject.removeDuplicates();
      listDisplay(vT.val());
    }
  });
  $('body').on('click', '#rmfirst', function() {
    var vT = $('input[name="dType"]:checked');
    if (sqlObject !== undefined) {
      sqlObject.removeFirst();
      listDisplay(vT.val());
    }
  });
});
