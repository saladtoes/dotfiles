    #!/bin/sh

    i3-msg workspace $(wmctrl -d|grep '*'|awk '{print $9}'|cut -c1):$1