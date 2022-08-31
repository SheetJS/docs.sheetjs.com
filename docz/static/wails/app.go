package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/ioutil"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// ShowError displays an error message in a desktop dialog.
func (a *App) ShowError(title string, message string) {
	_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.ErrorDialog,
		Title:   title,
		Message: message,
	})
}

// ShowInfo displays an info message in a desktop dialog.
func (a *App) ShowInfo(title string, message string) {
	_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   title,
		Message: message,
	})
}

// ReadFile shows an open file dialog and returns the data as Base64 string
func (a *App) ReadFile() string {
	selection, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select File",
		Filters: []runtime.FileFilter{
			{DisplayName: "Excel '97-2004 Workbooks (*.xls)", Pattern: "*.xls"},
			{DisplayName: "Excel Workbooks (*.xlsx)", Pattern: "*.xlsx"},
			{DisplayName: "Excel Binary Workbooks (*.xlsb)", Pattern: "*.xlsb"},
			{DisplayName: "Numbers Spreadsheets (*.numbers)", Pattern: "*.numbers"},
		},
	})
	if err != nil {
		_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Selection Error",
			Message: err.Error(),
		})
		return ""
	}
	data, err := ioutil.ReadFile(selection)
	if err != nil {
		_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Read Error",
			Message: err.Error(),
		})
		return ""
	}
	return base64.StdEncoding.EncodeToString(data)
}

// SaveFile shows a save file dialog and returns the path
func (a *App) SaveFile() string {
	selection, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Select File",
		DefaultFilename: "SheetJSWails.xlsx",
		Filters: []runtime.FileFilter{
			{DisplayName: "Excel '97-2004 Workbooks (*.xls)", Pattern: "*.xls"},
			{DisplayName: "Excel Workbooks (*.xlsx)", Pattern: "*.xlsx"},
			{DisplayName: "Excel Binary Workbooks (*.xlsb)", Pattern: "*.xlsb"},
			{DisplayName: "Numbers Spreadsheets (*.numbers)", Pattern: "*.numbers"},
		},
	})
	if err != nil {
		_, _ = runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Selection Error",
			Message: err.Error(),
		})
		return ""
	}
	return selection
}

// WriteFile decodes the first argument and writes to file
func (a *App) WriteFile(b64 string, path string) {
	buf, _ := base64.StdEncoding.DecodeString(b64)
	_ = ioutil.WriteFile(path, buf, 0644)
}
