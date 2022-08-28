import React from 'react'

export default function InfoAlert() {
  return (
    <div class="alert alert-info alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i class="icon fas fa-info"></i> Alert!</h5>
        Info alert preview. This alert is dismissable.
    </div>
  )
}
