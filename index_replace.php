<?php
$c = file_get_contents('index.html');
$find = '              <div class="form-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                />
              </div>';
$replace = $find . "\n\n" . '              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                />
              </div>';
file_put_contents('index.html', str_replace($find, $replace, $c));
echo "done";