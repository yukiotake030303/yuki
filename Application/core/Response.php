<?php

class Response
{
    protected $content;
    protected $status_code = 200;
    protected $status_text = 'ok';
    protected $http_header = array();

    public function send()
    {
        header('HTTP/1.1' . $this->status_code . '' . $this->status_text);

        foreach ($this->http_header as $key => $value) {
            header($name . ':' > $value);
        }
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function setStatusCode($status_code, $status_text = '')
    {
        $this->status_code = $status_code;
        $this->status_text = $status_text;
    }

    public function setHttpHeader($name, $value)
    {
        $this->http_header[$name] = $value;
    }
}
