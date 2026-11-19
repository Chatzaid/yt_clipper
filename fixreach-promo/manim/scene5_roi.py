from manim import *
BG="#0B0F19"; ORANGE="#F97316"; GREEN="#10B981"; WHITE="#F9FAFB"
class Scene5ROI(Scene):
    def construct(self):
        self.camera.background_color=BG
        title=Text("ONE REPAIR CAN COVER DAYS OF ADS",font_size=34,color=WHITE,weight=BOLD).to_edge(UP)
        margin=RoundedRectangle(width=4.4,height=1.65,corner_radius=.2,color=GREEN,fill_color="#111827",fill_opacity=1,stroke_width=3)
        ad=RoundedRectangle(width=4.4,height=1.65,corner_radius=.2,color=ORANGE,fill_color="#111827",fill_opacity=1,stroke_width=3)
        mt=Text("1 REPAIR MARGIN",font_size=28,color=GREEN,weight=BOLD).move_to(margin)
        at=Text("MULTI-DAY AD SPEND",font_size=26,color=ORANGE,weight=BOLD).move_to(ad)
        gt=Text(">",font_size=64,color=WHITE,weight=BOLD)
        eq=VGroup(VGroup(margin,mt),gt,VGroup(ad,at)).arrange(RIGHT,buff=.28).scale(.9).move_to(UP*.5)
        self.play(Write(title),FadeIn(eq,shift=UP),run_time=2)
        bars=VGroup()
        for i,h in enumerate([.8,1.1,1.35,1.65,1.95,2.3]):
            bars.add(Rectangle(width=.72,height=h,fill_color=GREEN,fill_opacity=.9,stroke_color=GREEN).move_to(DOWN*1.65+RIGHT*(i-2.5)*.9+UP*h/2))
        chart_label=Text("STEADY DAILY JOBS",font_size=25,color=WHITE,weight=BOLD).next_to(bars,DOWN,buff=.25)
        lock=RoundedRectangle(width=3.2,height=.72,corner_radius=.15,color=GREEN,fill_color="#111827",fill_opacity=1).to_edge(DOWN)
        locktxt=Text("YOUR SERVICE RATE  100%",font_size=21,color=GREEN,weight=BOLD).move_to(lock)
        self.play(LaggedStart(*[GrowFromEdge(b,DOWN) for b in bars],lag_ratio=.12),FadeIn(chart_label),FadeIn(lock),Write(locktxt),run_time=3)
        self.wait(7)
